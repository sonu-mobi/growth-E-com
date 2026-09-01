import { NextResponse } from "next/server";
import { ProductsApi } from "@api/modules/products.api";

export async function GET(request, { params }) {
  const { category } = await params;
  const { searchParams } = request.nextUrl;
  const limit = Number(searchParams.get("limit")) || 4;
  const skip = Number(searchParams.get("skip")) || 0;

  const response = await ProductsApi.getProductsByCategory(category, { limit, skip });

  if (!response.status) {
    return NextResponse.json(
      { message: response.error || "Failed to load products" },
      { status: response.statusCode || 500 }
    );
  }

  return NextResponse.json(response.data);
}
