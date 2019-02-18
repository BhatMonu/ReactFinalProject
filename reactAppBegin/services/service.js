//class ProductService {
//     getData() {
//         let promise = fetch("http://localhost:4070/api/products");
//         return promise;
//     }
//     postData(prd) {
//         let promise = fetch("http://localhost:4070/api/products",
//             {
//                 method: "POST",
//                 headers:
//                     { "Content-Type": "application/json" },
//                 body: JSON.stringify(prd)
//             });
//         return promise;
//     }
//     deteteData(id) {
//         alert(id)
//         let promise = fetch(`http://localhost:4070/api/products/${id}`,
//             {
//                 method: "DELETE",
//                 headers:
//                     { "Content-Type": "application/json" }

//             });
//         return promise;
//     }
//     updateData(prd) {
//         alert(JSON.stringify(prd))
//         let promise = fetch(`http://localhost:4070/api/products/${prd.ProductId}`,
//             {
//                 method: "PUT",
//                 headers:
//                     { "Content-Type": "application/json" },
//                 body: JSON.stringify(prd)

//             });
//         return promise;
//     }
// }
//export default ProductService;