import React, { useContext } from 'react';
import styled from 'styled-components';
import ICategorisedIngredient from '../Interfaces/CategorisedIngredient';
import StyledHeading from './Shared/Heading';
import { StyledButton, FooterButton } from './Button';
import StyledCategory from './Category';
import { CustomiseContext } from '../CustomiseContext';
import StyledIngredient from './Ingredient';
import StyledSelectedIngredient from './SelectedIngredient';
import IWordpressProduct, { ISelectableProduct } from '../Interfaces/WordpressProduct';
import { StyledText, Message, SummaryPriceRow, TotalPriceRow } from './Shared/Text';
import { IHeading } from '../Interfaces/Heading';
import IErrorResponse from '../Interfaces/ErrorResponse';
import { getUniqueIngredients } from '../Helpers/Helpers';
import ICustomProductDBModel from '../Interfaces/CustomProduct';
import LoadingAnimation from './LoadingAnimation';
import { track } from './Analytics';

export interface SelectionTableProps {
  categorisedIngredients: ICategorisedIngredient[]
  baseProduct: ISelectableProduct
}

export interface IngredientsInnerWrapperProps {
  templateRows: number
}

const SelectionTable: React.SFC<SelectionTableProps> = ({ categorisedIngredients, baseProduct }) => {

  const { updateCategorisedIngredients, toggleDescriptionVisibility, isDescriptionVisible, addToMixture, currentMixture, headings, updateHeadings, setApplicationError, userName, isProductBeingAmended, updateIsCheckoutButtonSelected, isCheckoutButtonSelected, uniqueId, bearerToken, saveUserName, toggleCustomiseMessageVisibility } = useContext(CustomiseContext);

  const onCategorySelect = (categoryId: number) => {
    track({
      distinct_id: uniqueId,
      event_type: "Category selected",
      category_name: categorisedIngredients.filter(cat => cat.id === categoryId)[0].category
    }, bearerToken);
    updateCategorisedIngredients(
      categorisedIngredients.map(category => {
        category.ingredients.map(ingredient => ingredient.selected = false);
        category.selected = false;
        if (category.id === categoryId) {
          category.selected = true;
          category.ingredients[0].selected = true;
        }
        return category;
      })
    )
  }

  const onIngredientSelect = (ingredientId: number) => {
    if(userName !== "")
      saveUserName("");
    updateCategorisedIngredients(
      categorisedIngredients.map(category => {
        category.ingredients.map(ingredient => {
          ingredient.selected = false;
          if (ingredient.id === ingredientId) {
            ingredient.recentlySelected = !ingredient.recentlySelected;
            ingredient.selected = !ingredient.selected;
          }
        });
        return category;
      })
    )
    logSelectedIngredient();
  }

  const logSelectedIngredient = () => {
    categorisedIngredients.map(cat => {
      if(cat.selected) {
        const selectedIngredient = cat.ingredients.filter(ingredient => ingredient.selected);
        track({
          distinct_id: uniqueId,
          event_type: "Ingredient selected",
          selected_ingredient: selectedIngredient[0].name
        }, bearerToken);
      }
    });
  }

  const getSelectedCategoryIngredients = () => {
    return categorisedIngredients.filter(category => category.selected)[0].ingredients;
  }

  const getIngredientTemplateRow = () => {
    switch (categorisedIngredients.filter(category => category.selected)[0].ingredients.length) {
      case 1:
      case 2:
      case 3:
        return 1;
      case 4:
      case 5:
      case 6:
        return 2;
      case 7:
      case 8:
      case 9:
        return 3;
      default:
        return 1;
    }
  }

  const areThereRecentlySelectedProducts = () => {
    return categorisedIngredients
      .flatMap(categories => categories.ingredients)
      .filter(ingredients => ingredients.selected).length > 0
  }

  const addToCart = () => {
    const currentlySelectedProduct = getSelectedProducts();
    if (currentMixture.some(x => x.id === currentlySelectedProduct[0].id))
      return removeFromCart(currentlySelectedProduct[0]);
    if (currentMixture.length > 0)
      return addToMixture(getUniqueIngredients([...currentMixture, ...currentlySelectedProduct]));
    addToMixture(getUniqueIngredients(currentlySelectedProduct));
  }

  const removeFromCart = (selectedProduct: ISelectableProduct) => {
    toggleCustomiseMessageVisibility(false);
    addToMixture(currentMixture.filter(ingredient => ingredient.id !== selectedProduct.id))
  }

  const toggleDescription = () => {
    categorisedIngredients.map(cat => {
      if (cat.selected) {
        const selectedIngredient = cat.ingredients.filter(ingredient => ingredient.selected);
        if (!isDescriptionVisible) {
          track({
            distinct_id: uniqueId,
            event_type: "Open description",
            read_description_for: selectedIngredient[0].name
          }, bearerToken);
        }
      }
    });
    let currentVisibility = isDescriptionVisible;
    toggleDescriptionVisibility(currentVisibility = !isDescriptionVisible)
  }

  const getSelectedProducts = () => {
    return getUniqueIngredients(categorisedIngredients
      .flatMap(categories => categories.ingredients)
      .filter(x => x.selected))
  }

  const getSelectionMessage = () => {
    if (currentMixture.length === 2 && isProductBeingAmended)
      return "Remove the products below to amend";
    if (currentMixture.length === 1)
      return "Please add one more ingredient";
    if (currentMixture.length === 2)
      return "View summary";
    return "Please add two ingredients";
  }

  const getAlreadyAddedMixtureIngredients = () => {
    return getSelectedProducts().flatMap(x => {
      return currentMixture.filter(y => x.id === y.id)
    })[0];
  }

  const toggleSummaryScreen = () => {
    updateHeadings(
      headings.map(heading => {
        heading.selected = false;
        if (heading.id === 1) // summary heading id
          heading.selected = !heading.selected;
        return heading;
      })
    )
  }

  const toggleViews = (headingId: number, fromMessage: boolean = false) => {
    if((fromMessage === true) && (currentMixture.length !== 2))
      return;
    updateHeadings(
      headings.map(heading => {
        heading.selected = false;
        if (heading.id === headingId)
          heading.selected = !heading.selected;
        return heading;
      })
    )
  }

  const isSummaryHeadingSelected = () => {
    return (headings.find(heading => heading.selected) as IHeading).id === 1;
  }

  const goToCheckout = async () => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/new-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + bearerToken
      },
      cache: 'no-cache',
      body: JSON.stringify(newProduct)
    })
      .then(res => res.ok ? res.json() : res.json().then((errorResponse: IErrorResponse) => {
        errorResponse.uiMessage = "Sorry, we weren't able to create your product. Please try again later";
        setApplicationError(errorResponse);
      }))
      .then((product: IWordpressProduct) => {
        track({
          distinct_id: uniqueId,
          event_type: "Buy now selected",
          ingredients: currentMixture.map(x => x.name).join(' & ')
        }, bearerToken).then(() => {
          if (product)
            window.location.assign(`${process.env.REACT_APP_WEBSITE_URL}/cart?add-to-cart=${product.id}`)
        });
      })
      .catch((error: IErrorResponse) => {
        setApplicationError({
          error: true,
          code: error.code,
          message: error.message,
          uiMessage: "Sorry, we weren't able to create your product. Please try again later"
        })
      });
  }

  const toggleButtonText = () => currentMixture.length !== 2 ? showRemoveOrAdd() : "view summary";

  const showRemoveOrAdd = () => getAlreadyAddedMixtureIngredients() ? "Remove -" : "Add +";

  const getMixturePrice = () => {
    if (currentMixture.length) {
      const addedIngredientsPrice =
        currentMixture
          .map(x => Number(x.price))
          .reduce((acc, val) => acc + val);
      return addedIngredientsPrice + Number(baseProduct.price);
    }
    return Number(baseProduct.price);
  }

  const createFinalProductToSaveToDatabase = () => {
    const databaseProduct: ICustomProductDBModel = {
      ingredients: currentMixture.map(ingredient => {
        return {
          name: ingredient.name,
          id: ingredient.id
        }
      }),
      amended: isProductBeingAmended
    };
    return databaseProduct;
  }

  const changeHeadingTextIfDesktop = () => {
    if(window.innerWidth >= 768 && headings[0].selected)
      return headings[0].desktopText;
    return headings[1].selected ? `back` : headings[0].headingText;
  }

  const saveProductToDatabase = () => {
    updateIsCheckoutButtonSelected(true);
    return fetch(`${process.env.REACT_APP_SERVER_URL}/save-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + bearerToken
      },
      cache: 'no-cache',
      body: JSON.stringify(createFinalProductToSaveToDatabase())
    })
      .finally(() => goToCheckout())
  }

  const newProduct = {
    name: userName ? `${userName}'s Product` : "Your bespoke product",
    type: 'simple',
    regular_price: `${getMixturePrice()}`,
    description: '',
    short_description: `Your custom mixture including ${currentMixture.flatMap(mix => mix.name).join(", ")} & the signature base+ ingredient`,
    categories: [
      {
        id: 21
      }
    ],
    images: [
      {
        src: 'http://baseplus.co.uk/wp-content/uploads/2018/12/productImageDefault.jpg'
      }
    ]
  }

  return (
    <React.Fragment>
      {
        isCheckoutButtonSelected ?
          <LoadingWrapper>
            <LoadingAnimation />
            <StyledText>{`Thank you${userName ? ` ${userName}` : ''}, please wait whilst we make create your bespoke product`}</StyledText>
          </LoadingWrapper>
          :
          <SelectionWrapper>
            <Categories>
              {
                !isSummaryHeadingSelected() &&
                <CategoriesWrapper>
                  {categorisedIngredients.map(category => <StyledCategory selected={category.selected} selectCategory={() => onCategorySelect(category.id)} key={category.id}>{category.category}</StyledCategory>)}
                </CategoriesWrapper>
              }
            </Categories>
            <Ingredients>
              <StyledHeading onClick={() => toggleViews(headings[0].id)} selected={headings[0].selected}>
                {changeHeadingTextIfDesktop()}
              </StyledHeading>
            </Ingredients>
            <IngredientsWrapper>
              <React.Fragment>
                {!isSummaryHeadingSelected() && <Message onClick={() => toggleViews(headings[1].id, true)}>{getSelectionMessage()}</Message>}
                <SelectedIngredientsWrapper>
                  {currentMixture.map(ingredient => <StyledSelectedIngredient key={ingredient.id} removeFromCart={() => removeFromCart(ingredient)} ingredientName={ingredient.name}></StyledSelectedIngredient>)}
                </SelectedIngredientsWrapper>
                {
                  isSummaryHeadingSelected() ?
                    <SummaryIngredientsWrap>
                      {
                        isSummaryHeadingSelected() && currentMixture.length > 0 ?
                          currentMixture.map(ingredient => <StyledIngredient isSummaryScreen={isSummaryHeadingSelected()} key={ingredient.id} ingredient={ingredient} selectIngredient={() => onIngredientSelect(ingredient.id)}></StyledIngredient>)
                          :
                          <h3>{userName ? `Please select two ingredients ${userName}` : "No ingredients selected"}</h3>
                      }
                      <SummaryPrices>
                        <h2>Your product</h2>
                        {currentMixture.map(ingredient => <SummaryPriceRow key={ingredient.id}>{ingredient.name} <span>£{ingredient.price}</span></SummaryPriceRow>)}
                        {<SummaryPriceRow>{baseProduct.name} <span>£{baseProduct.price}</span></SummaryPriceRow>}
                        {<TotalPriceRow>Mixture <span>£{getMixturePrice()}</span></TotalPriceRow>}
                        <StyledButton onClick={() => currentMixture.length === 2 ? saveProductToDatabase() : toggleViews(0)}>{currentMixture.length === 2 ? 'Checkout' : 'Back'}</StyledButton>
                      </SummaryPrices>
                    </SummaryIngredientsWrap>
                    :
                    categorisedIngredients.some(category => category.selected) &&
                    <IngredientsInnerWrapper templateRows={getIngredientTemplateRow()}>
                      {
                        getSelectedCategoryIngredients().map(ingredient => <StyledIngredient key={ingredient.id} ingredient={ingredient} selectIngredient={() => onIngredientSelect(ingredient.id)}></StyledIngredient>)
                      }
                    </IngredientsInnerWrapper>
                }
              </React.Fragment>
            </IngredientsWrapper>
            <Summary>
              <StyledHeading onClick={() => toggleViews(headings[1].id)} selected={headings[1].selected}>
                {headings[1].headingText}
              </StyledHeading>
            </Summary>
            {
              !isSummaryHeadingSelected() &&
              <React.Fragment>
                <FooterWrap>
                  <div onClick={toggleDescription} className="viewProductInfo">
                    {areThereRecentlySelectedProducts() ? `${ isDescriptionVisible ? 'Hide' : 'View'} ${getSelectedProducts()[0].name} information` : "Please select a product"}
                  </div>
                  <FooterButton className={getAlreadyAddedMixtureIngredients() ? '' : 'green'} onClick={currentMixture.length === 2 ? toggleSummaryScreen : addToCart}>{toggleButtonText()}</FooterButton>
                </FooterWrap>
                <IngredientDescription className={isDescriptionVisible ? "open" : "closed"}>
                  {
                    <React.Fragment>
                      <StyledText>
                        {areThereRecentlySelectedProducts() ? getSelectedProducts()[0].description : "No information available"}
                      </StyledText>
                      <FooterButton onClick={currentMixture.length === 2 ? toggleSummaryScreen : addToCart}>{toggleButtonText()}</FooterButton>
                    </React.Fragment>
                  }
                </IngredientDescription>
              </React.Fragment>
            }
          </SelectionWrapper>
      }
    </React.Fragment>

  )
}

export default SelectionTable;

const SummaryIngredientsWrap = styled.div`
  margin: 50px 0 0;
  grid-template-columns: 1fr 1fr;
  display: grid;
  grid-column: 1/span 2;
  ${props => props.theme.mediaQueries.tablet} {
    margin: 0;
  }
`

const LoadingWrapper = styled.div`
  text-align: center;
`

const SummaryPrices = styled.div`
  grid-column: 1/span2;
  text-align: center;
  padding: 20px 0 0 0;
  border-top: solid 1px ${props => props.theme.brandColours.baseDefaultGreen};
  max-width: 90%;
  margin: 30px auto 0;
  width: 100%;
  h2{
    margin: 0 0 15px 0;
    font-size: 15pt;
    color: ${props => props.theme.brandColours.baseDarkGreen};
    font-family: ${props => props.theme.bodyFont};
  }
  ${props => props.theme.mediaQueries.tablet} {
    grid-row: 3;
  }
`;

const SelectedIngredientsWrapper = styled.div`
  grid-column: 1/span 3;
  text-align: center;
  justify-content: space-evenly;
  display: flex;
  margin: 20px auto 0;
  max-width: 70%;
  width: 100%;
`;

const FooterWrap = styled.div`
  border-top: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  color: ${props => props.theme.brandColours.baseDarkGreen};
  width:100%;
  font-size: 11pt;
  text-align: center;
  grid-column: 1/ span 2;
  margin: 0;
  z-index: 5;
  background: #fff;
  position: absolute;
  bottom: 0;
  font-family: ${props => props.theme.bodyFont};
  .viewProductInfo {
    padding: 3vh 0;
    float: left;
    width: 65%;
    font-size: 9pt;
  }
  .green{
    background: ${props => props.theme.brandColours.baseLightGreen};
  }
  ${props => props.theme.mediaQueries.tablet} {
    display: none;
  }
`;

const SelectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 59px 1fr;
  height: 100%;
  .open{
    transform: translateY(0vh);
  }
  .closed{
    transform: translateY(100vh);
  }
  ${props => props.theme.mediaQueries.tablet} {
    grid-template-rows: auto 1fr;
    grid-template-columns: 200px 1fr 300px;
    .closed {
      transform: translateY(0vh);
    }
  }
`;

const CategoriesWrapper = styled.div`
  width:100%;
  display: flex;
  ${props => props.theme.mediaQueries.tablet} {
    display: block;
  }
`;

const Categories = styled.div`
  border-top: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  grid-row: 2;
  grid-column: 1/ span 2;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 2px;
  } 
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.brandColours.baseDefaultGreen}; 
    border-radius: 5px;
  }
  h2{
    display: none;
  }
  ${props => props.theme.mediaQueries.tablet} {
    h2{
      display: none;
      text-align:left;
      padding: 20px;
    }
    border: none;
    border-right: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
    grid-column: 1;
  }
`;

const Summary = styled.div`
  border-left: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  grid-row: 1;
  grid-column: 2;
  ${props => props.theme.mediaQueries.tablet} {
    grid-column: 3;
    grid-row: 1 / span 2;
    h2{
      border-bottom: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
    }
  }
`;

const IngredientDescription = styled.div`
  grid-row: 1;
  grid-column: 2;
  padding: 6% 8%;
  position: absolute;
  bottom: 0;
  width: 84%;
  transition: all 0.5s ease-in-out;
  transform: translateY(100vh);
  background: #fff;
  p{
    font-size: 10pt;
    font-family: ${props => props.theme.bodyFont};
    line-height: 1.7em;
    height: 320px;
    padding-bottom: 8vh;
    overflow-y: scroll;
  }
  button {
    display: none;
  }
  ${props => props.theme.mediaQueries.tablet} {
    background: transparent;
    position: static;
    grid-column: 3;
    width: auto;
    grid-row: 2;
    p{
      height: auto;
      max-height: 386px;
      padding: 0;
      overflow-y: auto;
      width: auto;
    }
    button {
      display: inline-block;
    }
  }
`;

const IngredientsWrapper = styled.div`
  width:100%;
  display: grid;
  grid-column: 1/ span 2;
  grid-row: 3;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 35px auto 1fr;
  .selected {
    opacity: 1;
    pointer-events: none;
  }
  ${props => props.theme.mediaQueries.tablet} {
    grid-column: 2;
    grid-row: 2;
    grid-template-rows: auto auto 1fr;
  }
  h3{
    text-align: center;
    grid-column: 1/span2;
    font-size: 13pt;
    color: ${props => props.theme.brandColours.baseDarkGreen};
    font-family: ${props => props.theme.bodyFont};
  }
`;

const IngredientsInnerWrapper = styled.div`
  display: grid;
  grid-column: 1/ span 2;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 150px);
  margin: 0 auto;
  width: 90%;
  grid-gap: 20px;
  max-height: 376px;
  overflow: scroll;
  ${props => props.theme.mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(${(props: IngredientsInnerWrapperProps) => props.templateRows}, 160px);
  }
  ${props => props.theme.mediaQueries.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Ingredients = styled.div`
  grid-row: 1
  grid-column: 1;
  ${props => props.theme.mediaQueries.tablet} {
    border-bottom: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
    grid-column: 1 /span 2;
  }
`;
