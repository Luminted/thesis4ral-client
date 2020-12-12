export interface IProps {
  graphicEndpoint: string;
  height: number;
  eventHandlerMapping: { [key in string]: (event?: any) => void };
  classnames?: string[];
}
