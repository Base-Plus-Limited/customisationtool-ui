import { IAnalyticsEvent } from "../../Interfaces/Analytics";

export const track = async (event: IAnalyticsEvent) => {
  return fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify({
      event_type: event.event_type,
      distinct_id: event.distinct_id,
      category_name: event.category_name,
      read_description_for: event.read_description_for,
      ingredients: event.ingredients,
      selected_ingredient: event.selected_ingredient
    })
  }).then()
  .catch((error) => console.error(error))
}

export const generateUniqueId = () => {
  return btoa(Math.random().toString()).substring(0,12)
}