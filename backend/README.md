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