import { NextResponse } from "next/server";
import { CategoriesApi } from "@api/modules/categorie.api";

export async function GET() {
  const response = await CategoriesApi.getCategories();

  if (!response.status) {
    return NextResponse.json(
      { message: response.error || "Failed to load categories" },
      { status: response.statusCode || 500 }
    );
  }

  return NextResponse.json(response.data);
}
