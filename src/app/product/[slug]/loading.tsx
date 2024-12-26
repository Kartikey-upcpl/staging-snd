import Shimmer from "@/components/shimmer/Shimmer";

export default function Loading() {
   return (
       <section className="bg-light product-single pb-12">
           <div className="container py-2">
               <Shimmer loading width={400} height={20} >
                   <div />
                   </Shimmer>
           </div>
           <div className="container bg-white py-6">
               <div className="row">
                   <div className="col-lg-5">
                       <Shimmer loading className="aspect-square product-single__media" width={"100%"} height={"auto"} backgroundSize="800px 100%">
                           <div />
                       </Shimmer>
                   </div>
                   <div className="col-lg-7">
                       <Shimmer loading className="product-single__name" width={300} height={24}>
                           <h1 className="product-single__name">
                               name
                           </h1>
                       </Shimmer>
                       <Shimmer loading className="product-single__rating" width={120} height={14}>
                           <div className="product-single__rating"/>
                       </Shimmer>
                       <Shimmer loading className="product-single__price" width={150} height={20}>
                           <div className="product-single__price"/>
                       </Shimmer>
                       <div className="product-single__short-desc">
                           <Shimmer loading className="mb-2" width="100%" height={10}>
                               <div className=""/>
                           </Shimmer>
                           <Shimmer loading className="mb-2" width="100%" height={10}>
                               <div className=""/>
                           </Shimmer>
                           <Shimmer loading className="" width={400} height={10}>
                               <div className=""/>
                           </Shimmer>
                       </div>


                       <div className="product-single__short-desc">
                           <Shimmer loading className="mb-4" width="60%" height={30}>
                               <div className=""/>
                           </Shimmer>
                           <Shimmer loading className="mb-4" width="100%" height={30}>
                               <div className=""/>
                           </Shimmer>
                           <Shimmer loading className="mb-4" width="40%" height={30}>
                               <div className=""/>
                           </Shimmer>


                           <Shimmer loading className="" width={250} height={50}>
                               <div className=""/>
                           </Shimmer>
                       </div>


                       <div className="product-single__meta-info mt-10 mb-0">
                           <Shimmer loading className="mb-1" width={120} height={10}>
                               <div className=""/>
                           </Shimmer>
                           <Shimmer loading className="" width={120} height={10}>
                               <div className=""/>
                           </Shimmer>
                       </div>
                   </div>
               </div>
           </div>
           <div className="product-single container bg-white">
               <div className="mt-5 py-6">
                  
                   <Shimmer loading className="bg-gray-100 py-2 px-4 text-base uppercase mb-4" width="100%" height={40}>
                       <div className=""/>
                   </Shimmer>
                   <div className="px-4 mb-10">
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-4" width={400} height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-4" width={100} height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading width={300} height={10}>
                           <div className=""/>
                       </Shimmer>
                   </div>
                   <Shimmer loading className="bg-gray-100 py-2 px-4 text-base uppercase mb-4" width="100%" height={40}>
                       <div className=""/>
                   </Shimmer>
                   <div className="px-4 mb-10">
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-4" width={400} height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-4" width={100} height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading width={300} height={10}>
                           <div className=""/>
                       </Shimmer>
                   </div>


                   <Shimmer loading className="bg-gray-100 py-2 px-4 text-base uppercase mb-4" width="100%" height={40}>
                       <div className=""/>
                   </Shimmer>
                   <div className="px-4">
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-4" width={400} height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-4" width={100} height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading className="mb-2" width="100%" height={10}>
                           <div className=""/>
                       </Shimmer>
                       <Shimmer loading width={300} height={10}>
                           <div className=""/>
                       </Shimmer>
                   </div>
               </div>
           </div>
       </section>
   );
}