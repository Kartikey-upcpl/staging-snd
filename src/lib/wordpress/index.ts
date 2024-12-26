export { getCategories, getWcCategories } from '@/lib/wordpress/category_api';
export {
    createCart,
    getCart,
    addToCart,
    removeItemCart,
    updateItemCart,
    updateShipping,
    applyCoupon,
    removeCoupon,
    updateCustomerCart,
} from '@/lib/wordpress/cart_api';

export { getSettings } from '@/lib/wordpress/api/app_builder_api';
export { getAddresses } from '@/lib/wordpress/api/address_api';
export { getPaymentMethos, getPaymentMethosPublic } from '@/lib/wordpress/api/payment_api';
export { updateCustomer } from '@/lib/wordpress/api/update_customer_api';
export { selectShippingRate } from '@/lib/wordpress/api/select_shipping_rate';
export { checkout, checkoutOrder } from '@/lib/wordpress/api/checkout_api';
export { getOrderReceived } from '@/lib/wordpress/api/order_received_api';
export { login, register, currentUser } from '@/lib/wordpress/api/auth_api';
export { getProductReviews, createProductReview } from "@/lib/wordpress/api/product_review_api";
export { getProducts, getProductById, getProductVariations, filterProducts } from "@/lib/wordpress/api/product_api";
export { getOrders, getOrder } from "@/lib/wordpress/api/order_api";
export { getTags, getTagById } from "@/lib/wordpress/api/tag_api";
export { getPost, getPage, getPostType, getElements, getPosts, getPostsWithPagination, getElement } from '@/lib/wordpress/api/post_type_api';
export { getMedia } from '@/lib/wordpress/api/media_api';
export { getBrands, getBrandById } from '@/lib/wordpress/api/brand_api';
export { getPostCategoryBySlug } from '@/lib/wordpress/api/post_category_api';
export { getWpUser } from '@/lib/wordpress/api/user_api';
export { getPostReviews, createPostReview, getPostReviewsWithPagination } from '@/lib/wordpress/api/review_post_api';

