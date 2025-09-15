import { CompleteTheOutfit } from '@/components/complete-the-outfit';
import { HomeSlider } from '@/components/home-slider';
import { PageWrapper } from '@/components/page-wrapper';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { getApprovedProducts } from '@/lib/firestore-helper';

export default async function Home() {
  const products = await getApprovedProducts();

  return (
    <PageWrapper>
      <HomeSlider />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          <aside className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="space-y-8">
              <ProductFilters />
              <CompleteTheOutfit />
            </div>
          </aside>
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-8 tracking-tight">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
