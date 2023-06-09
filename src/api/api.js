import axios from 'axios'
const baseURL = process.env.REACT_APP_URL
const HeaderConfig ={"headers" :{
    'Content-Type': 'application/json'}}
const TokenHeaderConfig = {"headers":{
    'Content-Type': 'application/json',
    'Authorization' : window.localStorage.getItem('Login')}}

export function LoadMainProducts(){
    return axios.get(`${baseURL}`,HeaderConfig)}
// Post : 로그인
export function PostLogin(id,password){
    const data = JSON.stringify({
        "username": id,
        "password": password,});
    axios.post(baseURL+"/login", data, HeaderConfig)
    .then(res => {
        console.log(res.headers.get("Authorization"))
        window.localStorage.setItem("Login", res.headers.get("Authorization"))
        window.localStorage.setItem("ID",id)
        document.location.href = '/'})
    .catch(err => {
        console.log(err)
        alert("아이디나 비밀번호를 다시 확인하세요.")});}

// Post : 회원가입
export function PostSignUp(body){
    console.log(body);
    axios
        .post(baseURL + "/join", body, HeaderConfig)
        .then((res) => {
            console.log(res.data);
            alert("회원가입이 완료되었습니다")
            document.location.href = '/login'
        })
        .catch((error) => {
            console.log(error)
            alert("이메일 혹은 전화번호 혹은 배송지가 중복됩니다")
        });}

//상품 정보 수정하기
export function PostEditProduct(editform){
    const data = JSON.stringify({
        name : editform.name,
		price : editform.price,
		category : editform.category,
		description : editform.description,
		size : editform.size,
		imgKey : editform.imgKey})
    axios.put(`${baseURL}/register/product/${editform.id}`,data,TokenHeaderConfig)
    .then(console.log('success'))}

export function LogOut(){
   
}
export function LoadProductsAll(){
    axios
        .get(baseURL + "/shop")
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });
}

//Productdetail.jsx : 상품 정보 GET
export function GetProductDetail(id){
    return axios.get(`${baseURL}/shop/detail/${id}`, TokenHeaderConfig);}

/* Mypage.jsx */

/* 유저 정보 조회 */
export function GetUserInfo(){
    return axios.get(`${baseURL}/user`,TokenHeaderConfig)}

/* 유저 정보변경 */
export function EditUserInfo(userstate){
    const userdata = JSON.stringify({
        "username" : userstate.username,
        "nickname" : userstate.nickname,
        "telephone" : userstate.telephone,
        "email" : userstate.email,
        "address" :  userstate.address
    });
    return axios.put(`${baseURL}/user`,userdata,TokenHeaderConfig)}
/* 비밀번호 변경 */
export function EditPassword(data){
    return axios.post(`${baseURL}/user/pwd_change`,data,TokenHeaderConfig)}

/* 중복검사 */
export function DuplicateCheck(info,data){
    return axios.get(`${baseURL}/check_${info}/${data}`,HeaderConfig)}

/* EditProduct.jsx : 판매등록한 상품 조회 GET 요청 */
export function LoadRegisteredProducts(){
    return axios.get(`${baseURL}/register/product/`,TokenHeaderConfig)}

/* EditProductDetail.jsx : 판매등록 상품 세부정보 / 변경 */

/* 세부정보 Load */
export function LoadRegisteredProductDetail(productID){
    return axios.get(`${baseURL}/register/product/${productID}/`,TokenHeaderConfig)}

/* 재고 변경 */
export function AddProductStock(data){
    return axios.get(`${baseURL}/register/add_stock/${data}/`,TokenHeaderConfig)}

/* 이름,가격,카테고리,설명,사이즈 변경 */
export function EditProductInfo(data){
    return axios.get(`${baseURL}/register/product/${data}/`,TokenHeaderConfig)}

/* 좋아요 상품 불러오기 */
export function LoadLikeProducts(){
    return axios.get(`${baseURL}/user/favorite`,TokenHeaderConfig)}

/* 장바구니 상품 불러오기*/
export function LoadCartProducts(){
    return axios.get(`${baseURL}/user/cart`,TokenHeaderConfig)}

/* 상품 주문 POST */
export function OrderProducts(body){
    return axios.post(`${baseURL}/user/order`,body,TokenHeaderConfig)}

/* 주문 목록 GET */
export function GetOrderList(){
    return axios.get(`${baseURL}/user/order`,TokenHeaderConfig)}

/* 장바구니 추가 POST*/
export function AddToCart(productId,data){
    return axios.post(`${baseURL}/user/cart/${productId}`,data,TokenHeaderConfig)}

/* 좋아요 추가 POST*/
export function Like(productId) {
    return axios.post(`${baseURL}/user/favorite/${productId}`,{}, TokenHeaderConfig)}

/* 좋아요 해제 DELETE*/
export function Dislike(productId){
    return axios.delete(`${baseURL}/user/favorite/${productId}`, TokenHeaderConfig)}

/* 상품 등록 POST*/
export function AddProducts(data) {
    return axios.post(`${baseURL}/register/product`,data, TokenHeaderConfig)}

/* 장바구니 리스트 제거 DELETE*/
export function DeleteCartItem(productId,size){
    return axios.delete(`${baseURL}/user/cart/all/${productId}?size=${size}`, TokenHeaderConfig)}

/* 장바구니 상품 단품 추가 POST*/
export function CountUpCartItem(productId,data){
    return axios.post(`${baseURL}/user/cart/${productId}`,data,TokenHeaderConfig)}

/* 장바구니 상품 단품 제거*/
export function CountDownCartItem(productId,size){
    return axios.delete(`${baseURL}/user/cart/${productId}?size=${size}`,TokenHeaderConfig)}

/* 등록 상품 제거 */
export function DeleteAddedProducts(productId){
    return axios.delete(`${baseURL}/register/product/${productId}}`, TokenHeaderConfig)}

/* 권한 업그레이드 */
export function UpgradeAuth(upgradeId){
    return axios.patch(`${baseURL}/admin/upgradeAuth/${upgradeId}`, "", TokenHeaderConfig)}

/* 상품 불러오기 GET (keyword, sort) */
export function LoadSearchProducts(keyword,sort){
    return axios.get(`${baseURL}/shop/search/${keyword}?sort=${sort}`,HeaderConfig)}

/* 상품 불러오기 GET (sort) */
export function LoadSortProducts(sort) {
    return axios.get(`${baseURL}/shop?sort=${sort}`, HeaderConfig)}

/* 상품 불러오기 GET (category, sort) */
export function LoadCategoryProducts(category, sort) {
    return axios.get(`${baseURL}/shop/category/${category}?sort=${sort}`, HeaderConfig)}