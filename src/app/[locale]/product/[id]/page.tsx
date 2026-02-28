import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import products from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Metadata } from 'next';

interface ProductPageProps {
    params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id, locale } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) return {};

    const name = locale === 'ar' ? product.name_ar : product.name_en;
    const description = locale === 'ar' ? product.description_ar : product.description_en;

    return {
        title: `${name} | Store`,
        description: description,
        openGraph: {
            title: name,
            description: description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id, locale } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const t = await getTranslations('Cart');
    const name = locale === 'ar' ? product.name_ar : product.name_en;
    const description = locale === 'ar' ? product.description_ar : product.description_en;

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    // SEO: JSON-LD Product Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: name,
        image: product.image,
        description: description,
        sku: product.id,
        offers: {
            '@type': 'Offer',
            url: `https://store.com/${locale}/product/${product.id}`,
            priceCurrency: 'USD',
            price: product.price,
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
                    <Image
                        src={product.image}
                        alt={name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
                            {product.category}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{name}</h1>
                        <div className="mt-4 text-3xl font-bold">${product.price.toFixed(2)}</div>
                    </div>

                    <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {description}
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button
                            disabled={!product.inStock}
                            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-700 disabled:bg-zinc-300"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            Add to Cart
                        </button>
                        <button className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                            <Heart className="h-6 w-6" />
                        </button>
                    </div>

                    {!product.inStock && (
                        <p className="text-sm font-medium text-red-500">Currently out of stock</p>
                    )}

                    <div className="grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-3">
                        <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium focus:outline-none">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <RotateCcw className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium focus:outline-none">30-Day Returns</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium focus:outline-none">2 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-24">
                    <h2 className="mb-8 text-3xl font-bold">Related Products</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p as any} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
