export interface IProps {
    graphicEndpoint: string
    width: number
    height: number
    eventHandlerMapping: {[key in string]: (event?: any) => void}
    withBorder?: boolean
}