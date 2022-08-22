export default class LocalStorage {

  public static getItem = <Type>(key: string): Type | null => {
    const localStorageValue = localStorage.getItem(key) || '';
    return localStorageValue ? (JSON.parse(localStorageValue) as Type) : null;
  };

  public static setItem = <Type>(key: string, value: Type): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  public static getLength = (): number => localStorage.length;
  
  public static removeItem = (key: string): void => localStorage.removeItem(key);  

  public static getKey = (index: number): string | null => localStorage.key(index);

  public static clear = (): void => localStorage.clear();
}