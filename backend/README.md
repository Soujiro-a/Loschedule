# Loschedule Backend

#### node / npm version : v16.15.0 / 8.10.0

## :calendar: 1. 제작 기간
- 2022.05.20 ~
    - 2022.06.13 부로 처음 기획했던 틀은 제작 완료
        - 지속적으로 코드 수정 및 보완 예정
    - 프론트엔드 제작에 맞추어 필요한 처리가 생길 시 추가 작성 예정
    - 테스트케이스 작성은 고려중이나, 현재는 프론트엔드 파트 제작에 더 힘을 쏟는게 맞다고 판단
- 개인 프로젝트

## :computer: 2. 사용 기술 
- [nestJS](https://nestjs.com/)
    - version : 8.2.6
- [mongoose](https://mongoosejs.com/)
    - version : 6.3.4
- jsonwebtoken
- bcrypt
- moment.js

## :hammer: 3. ERD

![LoscheduleERD](https://user-images.githubusercontent.com/68040092/173226915-21b38328-8729-4e3b-8544-789435ef7e38.png)

## :dart: 4. 구현 기능

<details>
<summary>User CRUD</summary>
<div markdown="1">

- [Create User](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/user/user.service.ts#L18)
- [Log in](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/user/user.service.ts#L40)
- [Get Profile](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/user/user.service.ts#L70)
- [Edit Profile](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/user/user.service.ts#L118)
- Management (only admin)
    - change user role

</div>
</details>

<details>
<summary>Character CRUD</summary>
<div markdown="1">

- [Search Character infomation](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/character/character.service.ts#L141)
- [Create Character in User](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/character/character.service.ts#L31)
- [Delete Character](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/character/character.service.ts#L69)
- [Update Character (synchronization Character info)](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/character/character.service.ts#L105)

</div>
</details>

<details>
<summary>Team CRUD</summary>
<div markdown="1">

- [Create Team](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L26)
- [Delete Team (only leader)](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L59)
- Edit Team
    - [Change Leader (only leader)](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L201)
    - [join Team member](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L102)
    - [Leave Team member](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L155)
- Read Team
    - [Team members info(+ leader info)](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L316)
    - [raids info](https://github.com/Soujiro-a/Loschedule/blob/20381bcf793a736b2ba65cff6876c13b10829f1a/backend/src/team/team.service.ts#L261)

</div>
</details>

<details>
<summary>Raid CRUD</summary>
<div markdown="1">

- [Create Raid](https://github.com/Soujiro-a/Loschedule/blob/ce135fabd158e8e64ebe10070bc4e46cf7405687/backend/src/raid/raid.service.ts#L25)
- [Delete Raid (only leader)](https://github.com/Soujiro-a/Loschedule/blob/ce135fabd158e8e64ebe10070bc4e46cf7405687/backend/src/raid/raid.service.ts#L78)
- [Edit Raid (only leader)](https://github.com/Soujiro-a/Loschedule/blob/ce135fabd158e8e64ebe10070bc4e46cf7405687/backend/src/raid/raid.service.ts#L121)
- [Read Raid](https://github.com/Soujiro-a/Loschedule/blob/ce135fabd158e8e64ebe10070bc4e46cf7405687/backend/src/raid/raid.service.ts#L182)

</div>
</details>

<details>
<summary>Lostark Character Info Crawling</summary>
<div markdown="1">

- [Character Infomation Scrape](https://github.com/Soujiro-a/Loschedule/blob/b5f32b093c210f0fe1594ad63ad6d639baac32db/backend/src/crawler/crawler.service.ts#L17)

</div>
</details>

<details>
<summary>Custom Decorator</summary>
<div markdown="1">

- [AuthUser](https://github.com/Soujiro-a/Loschedule/blob/main/backend/src/auth/auth-user.decorator.ts)
- [Role Based Authorization](https://github.com/Soujiro-a/Loschedule/blob/main/backend/src/auth/role.decorator.ts)

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

그런데, Date 타입으로 저장하면 불필요한 시간이 모두 저장되어버리는 문제도 있었지만,
무엇보다 KST(한국 표준 시간)로 제대로 저장이 되지 않았다.

추후 프론트를 만들면서 바뀔 여지도 분명 있겠지만, 우선은 날짜, 시간, 분까지만 저장하고 
화면에 출력하게 되지 않을까 하는 생각이고, 
그렇게 만들려고 한다면 mongodb에서 Date 타입 대신 string 타입으로 지정 후 YYYY-MM-DD HH:mm 포맷을 통해 
내가 생각했던 방법대로 저장할 수 있었다.
```

</div>
</details>

<details>
<summary>같은 필드내에서 $push, $pull 연산자를 동시에 사용할 수 없는 문제</summary>
<div markdown="1">

```
팀에 리더를 교체하는 함수를 작성하는 과정에서 발생한 문제다.

teamModel에서 updateOne 메소드를 통해 리더를 새 유저로 교체하고, 
새 유저는 멤버 필드내에서 빼내고, 기존 리더를 멤버 필드로 삽입하는 작업을 구현중이었다.

MongoServerError: Updating the path 'members' would create a conflict at 'members'
그러던 중 나는 위와 같은 오류를 마주했고, 구글링을 하다가 스택오버플로우의 질문글을 보고 답을 찾을 수 있었다.
https://stackoverflow.com/questions/24300148/pull-and-addtoset-at-the-same-time-with-mongo

The issue is that MongoDB doesn’t allow multiple operations on the same property in the same update call. 
This means that the two operations must happen in two individually atomic operations.

요약하자면, 하나의 업데이트 호출에서 같은 속성(여기선 필드라고 봐도 될 것 같다)에 대한 
여러 작업을 지원하지 않는다는 이야기였다.

나는 members 필드내에서 기존 멤버를 빼내는 작업과, 
세 맴버(기존 리더)를 넣는 작업을 동시에 수행하려고 하여 오류가 발생했다.
그래서, 두 작업을 코드를 나누어 작성하여 문제를 해결할 수 있었다.
```

</div>
</details>

<details>
<summary>중첩 스키마(nestes schema) 작성 문제</summary>
<div markdown="1">

```
레이드 스키마 내에 캐릭터 정보가 최대 8명까지만 저장되기 때문에
다른 필드들처럼 ObjectId만 저장해놓는게 아닌, 필요한 캐릭터 정보들을 저장해두어도 
Document의 크기에 큰 지장이 없을 것이라 생각했다.
그리고, 추후 데이터를 불러올 때 populate를 안해도 되서 성능 향상에 도움이 될 것이라 생각했다.

이러한 이유로, 중첩 스키마를 작성하려고했는데, 구글링으로는 nestjs로 작성한 중첩 스키마에 대한 정보를 찾기가 힘들었다.
나는 캐릭터 필드의 모든 정보를 저장하고 싶은게 아닌, 
내가 원하는 정보들만 선택해서 넣고 싶었는데 원하는 정보가 나오지 않았다.

그래서 내가 할 수 있는 방법이라곤 Prop 데코레이터에 내가 원하는 데이터의 타입을 하나씩 지정해놓으면 될 것 같아 
작성하는 것 뿐이었는데, 다행히 원하는 결과를 얻을 수 있었다.
```

</div>
</details>

## :memo: 6. 만들면서 고민한 부분

</div>
</details>

<details>
<summary>RDBMS vs NoSQL</summary>
<div markdown="1">

```
가장 처음 고민한 파트이기도 했지만, 금방 답을 정해버린 파트였다.
나는 해당 프로젝트에서 NoSQL(MongoDB)를 선택했는데, 그 이유는 아래와 같다.

1. NestJS에서 NoSQL기반 데이터베이스를 사용해본 적이 없다.
만들게된 동기가 어떻던간에, 처음에 나는 '공부'라는 목적을 가지고 해당 프로젝트를 시작했다.

NestJS를 처음 사용하고 공부해봤던 Nomadcoders의 강의에서는 RDBMS(postgresql)을 사용하여 데이터베이스를 
구성했었기 때문에, 해본 적 없는 새로운 환경을 구축하는 방법을 익히고 싶었다.

2. ERD를 만들고나면 큰 틀을 수정하지 않고 그대로 가져갈 자신이 없었다.
슬프지만, 내 설계에 확신이 없다는 말이다. 
코딩도 마찬가지겠지만, 당시에 잘 짰다고 생각하는것도 시간이 지나면 더 나은 방법이 보이곤 한다.
혼자 설계하고 작업하는데 있어, ERD의 큰 변경이 발생할 경우 작업이 너무 크게 지연될 거라 생각해서 
상대적으로 유연하게 대처할 수 있는 NoSQL을 선택하게 되었다.
```

</div>
</details>

<details>
<summary>스키마에 ObjectId만 저장할까? 데이터를 통째로 저장할까?</summary>
<div markdown="1">

```
ERD를 생각하면서 고민했던 부분이다.
결론부터 말하자면, Raid Document 내의 characters field에는 각 character의 정보들을 통째로 저장하고
나머지는 ObjectId들을 저장해서 필요할 때 aggregate를 사용해서 필요한 데이터들을 populate하여 반환하기로 했다.

이렇게 정한 이유는 Raid Document 내의 characters field는 값이 4~8개로 제한적이라는 것이다.
다른 필드들은 값이 제한없이 늘어날 가능성이 있다. 한 document에 데이터를 16mb까지 저장이 가능하다고 알고있는데
값이 제한 없이 늘어나는 과정에서 데이터를 통째로 저장하면 16mb는 생각보다 크지 않을 수도 있다. 
(개인적으로는 이것도 엄청 크다고 생각하긴 하지만, 만에 하나..)

그래서, 값의 최대치가 정해져있는 파트 외에는 모두 ObjectId를 사용하기로 했다.

MongoDB를 사용하는데 있어, 퍼포먼스를 향상시키기위해선 populate와 같은 작업은 최소화하는게 좋다는 글들을 보았고,
그래서 되도록이면 데이터를 통째로 넣는게 좋을지도 모르겠다는 생각은 했지만, 
일단은 ObjectId를 쓰는 방법을 사용하기로 했다.
```

</div>
</details>

<details>
<summary>GraphQL vs Rest API</summary>
<div markdown="1">

```
나는 NestJS에서 Rest API로 구성해본 적이 없기 때문에 해당 프로젝트에서 Rest API를 사용했다.

코드를 작성하면서도 GraphQL로 마이그레이션을 할까 고민을 했지만, 결국 하지 않았다.
Rest API를 사용하면서 발생하는 가장 큰 문제는 OverFetching이었다.
UnderFetching은 생각보다 발생하지 않았다. (발생하지 않도록 신경쓰기도 했다만.)

추후 클라이언트 구성에 따라 GraphQL로의 마이그레이션 작업을 할 가능성도 있지만,
우선은 Rest API 기반으로 계속 구성해볼 생각이다.

지금 방향대로라면 프로젝트 상 GraphQL과 Rest API 양쪽을 선택하는 일은 없을 것이라 생각한다.
```

</div>
</details>