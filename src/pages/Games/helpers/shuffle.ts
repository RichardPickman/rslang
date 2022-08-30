const shuffle = (array: Array<any>): Array<any>  => array.sort(() => Math.random() - 0.5)
export default shuffle