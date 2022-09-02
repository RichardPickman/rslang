const playSound = (url: string) => {
 let sound = new Audio(url);
sound.play(); 
}
export default playSound