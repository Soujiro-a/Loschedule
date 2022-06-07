# Loschedule Backend

#### node / npm version : v16.15.0 / 8.10.0

## :calendar: 1. 제작 기간
- 2022.05.20 ~
- 개인 프로젝트

## :computer: 2. 사용 기술 
- [nestJS](https://nestjs.com/)
    - version : 8.2.6
- [mongoose](https://mongoosejs.com/)
    - version : 6.3.4

## :hammer: 3. ERD

![LoscheduleERD](https://user-images.githubusercontent.com/68040092/172323557-8ca04f48-998f-471d-817e-d23e6f335e39.png)

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

- Create Raid
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

<details>
<summary>캐릭터 등록/삭제 시 유저 스키마 ObjectId 추가/제거 문제</summary>
<div markdown="1">

```
캐릭터를 등록할 때, 유저에 해당 캐릭터의 id를 저장해두고, 
캐릭터를 지울 때 유저에게서 캐릭터의 id를 같이 지우는 방식으로 구현하고자했다.

처음에는 유저의 characters 필드에 캐릭터의 id를 직접 push하는 방식으로 구현했었다.
등록하는 건 큰 문제가 안됐지만, 같은 방식으로 캐릭터를 지우려고할 때 문제가 발생했다.

Array를 취급하듯이 filter를 사용해서 지우려는 캐릭터 Id와 일치하는 값을 지워주고 저장하는 방법을 사용하려고 했다.
그러나, 잘 되지 않았고, 구글링해보니 ObjectId를 비교하는 방법이 다르다고해서 ObjectID 타입으로 변환하면 된다는 등
여러 방법을 찾아보았으나, 우선 선택한건 String 형변환으로 비교하는 것이었다.
비교 자체는 잘 되었지만, 필터링이 제대로 이루어지지 않았다.

그래서 다른 자료들을 찾아보다가 updateOne 메소드 내에서 $pull 쿼리를 사용하여 값을 갱신하는 방법을 찾았고,
정상적으로 작동하였다.

이후, 일관성을 주기위해 등록할 때도 $push 쿼리를 사용하여 값을 등록하도록 변경하였다.
```

</div>
</details>

<details>
<summary>레이드 일정등록시 특정 날짜 입력 문제</summary>
<div markdown="1">

```
처음에 팀(공격대)에서 레이드 일정을 등록할 때, 날짜를 지정하는 거니까 Date 타입으로 저장해야겠다고 생각했다.

그런데, Date 타입으로 저장하면 불필요한 시간이 모두 저장되어버리는 문제도 있었지만, 무엇보다 KST(한국 표준 시간)로 제대로 저장이 되지 않았다.

추후 프론트를 만들면서 바뀔 여지도 분명 있겠지만, 우선은 날짜, 시간, 분까지만 저장하고 화면에 출력하게 되지 않을까 하는 생각이고, 그렇게 만들려고 한다면 mongodb에서 Date 타입 대신 string 타입으로 지정 후 YYYY-MM-DD HH:mm 포맷을 통해 내가 생각했던 방법대로 저장할 수 있었다.
```

</div>
</details>