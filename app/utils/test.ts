interface CartContext {
  cart: Cart;
  user: "premium" | "regular";
}

interface DiscountStrategy {
  apply(cartContext: CartContext): number;
}

export interface CartItem {
  item: string;
  price: number;
  quantity: number;
}

export class Cart {
  cart: CartItem[];
  constructor(cart: CartItem[]) {
    this.cart = cart;
  }

  get subTotal() {
    return this.cart.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
  }
}

export class PercentageDiscount implements DiscountStrategy {
  private discount: number;
  constructor(discount: number) {
    this.discount = discount;
  }
  apply(cartContext: CartContext): number {
    return (this.discount / 100) * cartContext.cart.subTotal;
  }
}

export class FlatDiscount implements DiscountStrategy {
  private discount: number;
  constructor(discount: number) {
    this.discount = discount;
  }

  apply(cartContext: CartContext): number {
    return Math.min(this.discount, cartContext.cart.subTotal);
  }
}

export class EligibleDiscount implements DiscountStrategy {
  private discountStrategy: DiscountStrategy;
  constructor(discountStrategy: DiscountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  apply(cartContext: CartContext): number {
    const subTotal = cartContext.cart.subTotal;
    if (subTotal < 5000) return 0;

    return this.discountStrategy.apply(cartContext);
  }
}

export class PremiumUserDiscount implements DiscountStrategy {
  private discountStrategy: DiscountStrategy;
  private userStatus: Pick<CartContext, "user">;
  constructor(
    discountStrategy: DiscountStrategy,
    userStatus: Pick<CartContext, "user">,
  ) {
    this.discountStrategy = discountStrategy;
    this.userStatus = userStatus;
  }

  apply(cartContext: CartContext): number {
    if (this.userStatus.user === "premium") {
      return this.discountStrategy.apply(cartContext);
    }
    return 0;
  }
}

export class PricingEngine {
  private cartContext: CartContext;
  private pricingRules: DiscountStrategy[];
  constructor(cartContext: CartContext, pricingRules: DiscountStrategy[]) {
    this.cartContext = cartContext;
    this.pricingRules = pricingRules;
  }

  payableAmount() {
    const pricingRule = this.pricingRules.reduce((prev, curr) => {
      return prev + curr.apply(this.cartContext);
    }, 0);

    return this.cartContext.cart.subTotal - pricingRule;
  }
}
