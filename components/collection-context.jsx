'use client';
import { createContext, useContext, useState } from 'react';
const CollectionContext = createContext(null);
export function CollectionProvider({children}) { const [selected, setSelected] = useState('necklace'); return <CollectionContext.Provider value={{selected,setSelected}}>{children}</CollectionContext.Provider>; }
export function useCollection() { return useContext(CollectionContext); }
