import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { RootState } from "../store/store";
import toast from "react-hot-toast";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} adicionado ao carrinho!`, {
      duration: 3000,
      icon: "🛒",
    });
  };

  const getCategoryDisplay = (category: string) => {
    switch (category.toUpperCase()) {
      case "ADITIVO":
        return "Aditivo";
      case "FERRAMENTAS":
        return "Ferramentas";
      case "ÓLEO":
        return "Óleo";
      case "PNEU":
        return "Pneu";
      case "CERA":
        return "Cera";
      case "LUBRIFICANTE":
        return "Lubrificante";
      case "ACESSÓRIOS":
        return "Acessórios";
      default:
        return "Autopeça";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 flex items-center justify-center ">
            <img
              className="h-96 w-full object-contain"
              src={`/${product.photoName}`}
              alt={product.name}
            />
          </div>
          <div className="p-8 md:w-1/2 relative">
            <div className="mb-20">
              <div className="bg-blue-500 text-white px-2 py-1 rounded-full inline-block mb-2">
                {getCategoryDisplay(product.productFamily)}
              </div>
              <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h2>
              <div className="mt-10">
                {/* <h3 className="text-lg font-medium text-gray-900">
                  Descrição do produto
                </h3> */}
                <p className="mt-2 text-gray-600">{product.productDesc}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
