import { Token } from 'aws-sdk';
import axios from 'axios'
const baseURL = process.env.REACT_APP_URL

const HeaderConfig ={"headers" :{
    'Content-Type': 'application/json'}}
const TokenHeaderConfig = {"headers":{
    'Content-Type': 'application/json',
    'Authorization' : window.localStorage.getItem('Login')
}}

// Post : 로그인
export function PostLogin(id,password){
    const data = JSON.stringify({
        "username": id,
        "password": password,
    });
    axios.post(baseURL+"/login", data, HeaderConfig
    ).then(response => {
            console.log(response.headers.get("Authorization"))
            // const { accessToken } = response.data;
            //localStorage에 
            window.localStorage.setItem("Login", response.headers.get("Authorization"))
            window.localStorage.setItem("ID",id)
            //getItem => 변수 가져오기 
            console.log("=======로그인 성공=========")
            const val = response.headers.get("Authorization")
            // setUser((mode)=>!mode)
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            // axios.defaults.headers.common['Authorization'] = val;
            // accessToken을 localStorage, cookie 등에 저장하지 않는다!      
            //main
            document.location.href = '/'
        }).catch(error => {
            // ... 에러 처리
            console.log("에러")
            console.log(error)
            alert("아이디나 비밀번호를 다시 확인하세요.")
        });
}
// Post : 회원가입
export function PostSignUp(body){
    console.log(body);
    axios
        .post(baseURL + "/join", body, HeaderConfig)
        .then((response) => {
            console.log(response.data);
            alert("회원가입이 완료되었습니다")
            document.location.href = '/login'
        })
        .catch((error) => {
            console.log(error)
            alert("이메일 혹은 전화번호 혹은 배송지가 중복됩니다")
        });
}


//상품 정보 수정하기
export function PostEditProduct(editform){
    const data = JSON.stringify({
        name : editform.name,
		price : editform.price,
		category : editform.category,
		description : editform.description,
		size : editform.size,
		imgKey : editform.imgKey
      })
    axios.put(`${baseURL}/register/product/${editform.id}`,data,TokenHeaderConfig)
    .then(res => console.log('success'))
}

export function LogOut(){
    // const { setUser } = useAxiosAuthContext();
    // setUser((mode) => !mode)
    // localStorage에서 token, username 삭제
    // user => false
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
    return axios.get(`${baseURL}/shop/detail/${id}`, TokenHeaderConfig);
}

//Mypage.jsx : 유저 정보 GET
export function GetUserInfo(){
    return axios.get(`${baseURL}/user`,TokenHeaderConfig)
}

export function EditUserInfo(userstate){
    const userdata = JSON.stringify({
        "username" : userstate.username,
        "nickname" : userstate.nickname,
        "telephone" : userstate.telephone,
        "email" : userstate.email,
        "address" :  userstate.address
    });
    return axios.put(`${baseURL}/user`,userdata,TokenHeaderConfig)
}

export function EditPassword(data){
    return axios.post(`${baseURL}/user/pwd_change`,data,TokenHeaderConfig)
}

export function DuplicateCheck(info,data){
    return axios.get(`${baseURL}/check_${info}/${data}`,HeaderConfig)
}
