export interface IAnalyticsEvent {
  distinct_id: string; 
  event_type: EventType;
  category_name?: string;
  ingredients?: string;
  read_description_for?: string;
  selected_ingredient?: string;
}

export type EventType = "Category selected" | "Customisation started" | "Buy now selected" | "Open description"  | "Ingredient selected";