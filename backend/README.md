# Loschedule Backend

#### node / npm version : v16.15.0 / 8.10.0

## :calendar: 1. 제작 기간
- 2022.05.20 ~
- 개인 프로젝트

## :computer: 2. 사용 기술 
- [nestJS](https://nestjs.com/)
    - version : 8.2.6

## :hammer: 3. ERD

![LoscheduleERD](https://user-images.githubusercontent.com/68040092/170011614-517e392e-5b34-4749-812e-4b2679e3e47d.PNG)

## :dart: 4. 구현 기능

<details>
<summary>User CRUD</summary>
<div markdown="1">

- Create User
- Log in
- See Profile
- Edit Profile
- Management (only admin)

</div>
</details>

<details>
<summary>Character CRUD</summary>
<div markdown="1">

- Search Character infomation
- Create Character in User
- Delete Character
- synchronization Character info

</div>
</details>

<details>
<summary>Team CRUD</summary>
<div markdown="1">

- Create Team
- Delete Team (only leader)
- invite User (only leader)
- Change Leader (only leader)
- Read Raids

</div>
</details>

<details>
<summary>Raid CRUD</summary>
<div markdown="1">

- Create Raid (only leader)
- Delete Raid (only leader)
- Edit Raid (only leader)
- Read Raid

</div>
</details>

## :rotating_light: 5. 트러블 슈팅

<details>
<summary>스키마에 pre save를 사용하려고 했을 때 발생했던 문제</summary>
<div markdown="1">

```
과거에 Express 기반 백엔드를 구축할 때는 schema 파일 안에 pre 메소드를 이용하여 save를 구현하여 동작했던 기억이 있어, 
처음에는 비슷한 방식으로 구현하려고 했었다.
그러나 구현한대로 동작하지 않아, 구글링을 통해 찾아봤는데, 각 모듈내에 Mongoose모듈을 import할 때 
비동기로 useFactory의 value로 함수를 넘겨주는데, 해당 함수 안에서 pre 메소드를 구현하여 동작시킬 수 있었다.
```


</div>
</details>

<details>
<summary>로스트아크 전투정보실 크롤링 시 발생했던 문제</summary>
<div markdown="1">

```
처음에 nestjs를 사용하여 크롤링을 하는 방법을 검색하다보니, nestjs-crawler라는 패키지가 있어,
처음에는 해당 패키지를 사용하여 크롤링을 하려고했으나, 원인불명의 오류로 페이지 정보를 제대로 불러오지 못하였다.
그래서, Nestjs 공식 Docs에 있는 httpModule인 @nestjs/axios를 사용하여 크롤링을 하려고하니, rxjs의 Observable형으로 
반환해주었기 때문에, 데이터를 확인하는 법도, 반환하는 법도 달랐고, 사용해본 적도 없어 상당히 고전했다.
결과적으로, 해당 자료를 구독(Subscribe)하고, 비동기로 값을 반환해주는 방식으로 html을 가져올 수 있었다.
가져온 html에서 cheerio를 사용하여 원하는 값을 추출할 수 있었다.
```

</div>
</details>