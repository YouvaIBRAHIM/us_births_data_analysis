export interface IGraphicsTabs{
  selectedButtonId: string | null, 
  onHandleClick: (id: string) => void
}

export interface IGraphicsTabsItem{
  id: string;
  label: string;
  icon?: JSX.Element,
  options: {
    type: string;
    [key: string]: unknown
  }
}