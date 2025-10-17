'use client'
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Category = () => {
  const { category } = useParams();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['product', category],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/product/category/${category}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div>
      {products?.data?.map((p) => (
        <div key={p.id}>{p.product_name}</div>
      ))}
    </div>
  );
};

export default Category;
