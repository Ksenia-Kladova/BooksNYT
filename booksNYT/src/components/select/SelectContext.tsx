import { createContext, useState, useContext, useMemo } from "react";
import type { ReactNode } from "react";

type SelectedCategoryType = {
    value: string,
    label: string | null
}

type SelectContextType = {
    selectedCategory: SelectedCategoryType;
    updateSelectedCategory: (category: SelectedCategoryType) => void;
};

type SelectProviderProps = {
    children: ReactNode;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const useBookCategory = (): SelectContextType => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
};

export const SelectProvider = ({ children }: SelectProviderProps) => {
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategoryType>({ value: "trade-fiction-paperback", label: "Fiction" });
    const updateSelectedCategory = ({ value, label }: SelectedCategoryType) => {
        setSelectedCategory({ value, label });
    };

    const defaultProps = useMemo(
        () => ({
            selectedCategory,
            updateSelectedCategory
        }),
        [selectedCategory],
    );

    return (
        <SelectContext.Provider value={defaultProps}>
            {children}
        </SelectContext.Provider>
    );
};
