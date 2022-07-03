# Loschedule Frontend

## :calendar: 1. 제작 기간
- 2022.06.22 ~
- 개인 프로젝트

## :computer: 2. 사용 기술
- react : 18.1.0 
- NextJS : 12.1.6 (latest)
- redux : 4.2.0
- react-redux : 8.0.2
- react-hook-form : 7.32.2
- tailwindcss : 3.1.2


## :hammer: 3. 페이지 구성
![LoschedulePages](https://user-images.githubusercontent.com/68040092/175569452-f77a49b2-67b8-4bc7-ba90-45886106a69f.png)

## :dart: 4. 구현 기능

## :rotating_light: 5. 트러블 슈팅

<details>
<summary>A non-serializable value was detected in an action, in the path: `register`</summary>
<div markdown="1">

```
redux는 직렬화 할 수 없는 값을 state, action에 넣지 않아야한다는 원칙을 가지고 있다.
그런데, 직렬화 할 수 없는 데이터를 처리해야하는 작업(로그인 과정)때문에, 해당 경고가 떴다.

예전에는 configureStore내에서 middleware로 getDefaultMiddleware 함수를 불러와 설정하는 방법을 사용했지만, 이제는 해당 방법 대신, middleware 키 값에 콜백함수를 작성하는 방법으로 변경되었는데, 이 때 매개변수가 getDefaultMiddleware다.

그래서, getDefaultMiddleware 함수 내에서 redux-persist에서 발생하는 각 액션들에 대한 직렬화 검사를 무시하는 코드를 작성하여 해결하였다.
```

</div>
</details>

<details>
<summary>Redux-toolkit createAsyncThunk type 적용 문제</summary>
<div markdown="1">

```
createAsyncThunk를 사용하여 Action을 만드는데 발생했던 문제다.
나는 type을 정확하게 지정하여 하고싶었고, thunk의 extra 변수를 타입에 추가하여 적용하려고 했다.
처음에는 dispatch를 할 때, extra 값을 같이 넣어서 보내는 건 줄 알았는데, 잘못 알고 있었다.

https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
위 예시와 같이, configureStore의 middleware 키 값에 대해 thunk 값을 추가해주면 되는 것이었다.
redux-thunk 패키지를 직접 사용하는게 아니라, redux-toolkit을 사용하다보니 문제를 찾는데 갈피를 못잡고 상당한 시간이 걸렸다.
createAsyncThunk를 통해 '내부적으로 redux-thunk를 지원'한다는 문구를 보고선 찾아보았고, 잘 적용할 수 있었다.
```

</div>
</details>

<details>
<summary>로그인 후 첫페이지로 이동했을 떼 state가 바로 업데이트 되어 보이지 않는 문제</summary>
<div markdown="1">

```
isLoggedIn이라는 로그인 상태를 체크하기 위한 redux state를 가지고 있는 상태고,
/login 페이지에서 loginAction을 통해 백엔드 서버로 로그인 요청을 하고, 로그인 요청이 문제없이 처리됐을 때, isLoggedIn state 값을 변경해주고, 첫페이지로 넘어오게 처리를 만들었다. 그런데, 넘어오자마자 state가 반영되지 않고, 새로고침을 한번 해주어야만 변경된 state가 반영되는 문제가 발생했었다. 

문제 원인을 바로 이야기하자면, getServerSideProps에 있었다.
getServerSideProps를 호출하면서 초기 상태가 그대로 반영되어버리는 문제가 일어났다.
그래서, redux-persist를 통해 로그인 요청이 처리된 후의 state값들을 LocalStorage에 저장해놨지만, 처음에 getServerSideProps를 한번 호출하기 때문에 initialstate값이 그대로 반영되어서 나타나는 문제가 발생했다.
```

</div>
</details>

<details>
<summary>로그인 페이지에서 로그인 시도 시 에러 메시지 타입 에러 문제</summary>
<div markdown="1">

```
createAsyncThunk를 통해 만들어준 action에서 백엔드 api호출을 통해 잘못된 값을 받을 경우 reject를 하고, 에러메시지를 반환하도록 설정했다.

처음에 action을 dispatch한 값을 받아보는데 fulfill과 reject 시, meta 프로퍼티에 requestStatus 값이 달랐고, 해당 값들을 이용해 분기를 나누어 비밀번호가 불일치(reject)할 시에는 errorMessage를 띄워주려고했다. 내가 구현하고자 했던 바는 구현이 됐지만, 타입 에러가 발생했다.

그래서, 구글링 한 결과, RTK 공식 Docs createAsyncThunk 하단에 예시에서는 requestStatus값을 직접 비교하는게 아닌, 각 액션에 fulfill 프로퍼티에 match함수안에 dispatch한 값을 넣어주면서 fulfill됐을 경우를 체크하고 있었고, 똑같은 구조로 바꾼 결과 타입 에러를 없앨 수 있었다.
```

</div>
</details>