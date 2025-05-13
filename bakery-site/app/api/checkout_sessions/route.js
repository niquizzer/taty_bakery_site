import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { cartData } from "@/data/cartData";

import { stripe } from "../../../lib/stripe";

export async function POST() {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        const lineItems = cartData.map((product) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        description: product.description,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            };
        });
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems, 
            mode: "payment",
            success_url: `${origin}/success`,
            cancel_url: `${origin}/cancel`,
        });
        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}