import { create } from "zustand";
import type { OrderItemValues } from "@/src/features/orders/shared/schemas/order.schema";

type OrderStore = {
	tableNumber: number | null;
	waiterNotes: string;
	items: OrderItemValues[];
	setTableNumber: (tableNumber: number | null) => void;
	setWaiterNotes: (notes: string) => void;
	addItem: (item: OrderItemValues) => void;
	removeItem: (dishId: string) => void;
	updateQuantity: (dishId: string, quantity: number) => void;
	clearOrder: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
	tableNumber: null,
	waiterNotes: "",
	items: [],
	setTableNumber: (tableNumber) => set({ tableNumber }),
	setWaiterNotes: (waiterNotes) => set({ waiterNotes }),
	addItem: (item) =>
		set((state) => {
			const existing = state.items.find((i) => i.dishId === item.dishId);
			if (existing) {
				return {
					items: state.items.map((i) =>
						i.dishId === item.dishId
							? { ...i, quantity: i.quantity + item.quantity }
							: i,
					),
				};
			}
			return { items: [...state.items, item] };
		}),
	removeItem: (dishId) =>
		set((state) => ({ items: state.items.filter((i) => i.dishId !== dishId) })),
	updateQuantity: (dishId, quantity) =>
		set((state) => ({
			items: state.items.map((i) =>
				i.dishId === dishId ? { ...i, quantity: Math.max(1, quantity) } : i,
			),
		})),
	clearOrder: () => set({ tableNumber: null, waiterNotes: "", items: [] }),
}));
