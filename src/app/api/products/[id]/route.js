import { NextResponse } from "next/server";
import { ProductsApi } from "@api/modules/products.api";

export async function GET(_request, { params }) {
  const { id } = await params;
  const response = await ProductsApi.getProduct(id);

  if (!response.status) {
    return NextResponse.json(
      { message: response.error || "Product not found" },
      { status: response.statusCode || 404 }
    );
  }

  return NextResponse.json(response.data);
}
