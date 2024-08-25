export interface IGraphicsTabs{
  selectedButtonId: string | null, 
  onHandleClick: (id: string | null) => void
}

export interface IGraphicsTabsItem{
  id: string | null;
  label: string;
  icon?: JSX.Element,
  options: {
    type: string | null;
    [key: string]: unknown
  }
}