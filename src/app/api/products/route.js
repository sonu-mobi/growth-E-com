import { NextResponse } from "next/server";
import { ProductsApi } from "@api/modules/products.api";
import { PRODUCT_PAGE_LIMIT } from "@config/apiConfig";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const limit = Number(searchParams.get("limit")) || PRODUCT_PAGE_LIMIT;
  const skip = Number(searchParams.get("skip")) || 0;

  const response = await ProductsApi.getProducts({ limit, skip });

  if (!response.status) {
    return NextResponse.json(
      { message: response.error || "Failed to load products" },
      { status: response.statusCode || 500 }
    );
  }

  return NextResponse.json(response.data);
}
