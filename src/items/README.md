# Item Class
- Base Rarity:
  - [Common](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#common)
  - [Uncommon](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#uncommon)
  - [Rare](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#rare)
  - [Ultra Rare](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#ultra-rare)
  - [Legendary](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#legendary)
 
  
- Special Rarity:
  - [Special](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#special)
  - [Limited](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#limited)
  - [Event](https://github.com/CrauxZahard/BabuV2/blob/rpg/src/items/README.md#event)

## Item Object
| Param | Type | Optional? | Default Value | Description
| :---: | :---: | :---: | :---: | :---: |
  | id |  String | false | - | an unique id |
  | name | String | false | - | the name of this weapon |
  | rarity | String | false | - | rarity for this weapon |
  | ele | String | false | - | element of this weapon |
  | xp | Int | false | - | current xp |
  | owner | String | false | - | current owner user id|
  | originalOwner | String | false | - | an user id who originally got this weapon |
  | ownerHistory | Array\<String> | false | - | an array of user id who had this weapon |
  | stats | Object | false | - | base stats of this weapon (that later will be calculated or something) |
  | skills | Array\<String> | true | *null* | an array of skill name. |
  | maxSkillSize | Int | true | 0 | max amount of skills this weapon can have
```js
Item {
  id: String, //id must be unique
  name: String, //name of this weapon
  rarity: String, //rarity of this weapon
  ele: String, //element of this item
  xp: Int, //current xp
  lvl: Int, //current level
  owner: String, //current user id
  originalOwner: String, //an user id who originally got this weapon
  ownerHistory: Array<String>, //an array of user id who had this weapon
  stats: Object, //base stats of this weapon (that later will be calculated or something)
  skills?: Array<String>, //an array of skill name.
  maxSkillSize: Int //max amount of skills this weapon can hold
}
```

## Base Rarity

### Common
the most common rarity in the bot. This rarity may not have a skill.

How to get them? 
> 1. Gacha Pack
> 2. Server Drop (Rate: 50%)
> 3. Daily Summon (Rate: 35%)

### Uncommon
1.5x better than common rarity (stats-wise). This rarity may not have a skill.

How to get them? 
> 1. Gacha Pack
> 2. Server Drop (Rate: 38%)
> 3. Daily Summon (Rate: 47%)
### Rare
1.5x better than uncommon rarity (stats-wise). This rarity may have up to 1 skill.

How to get them? 
> 1. Gacha Pack
> 2. Server Drop (Rate: 10%)
> 3. Daily Summon (Rate: 12%)

### Ultra Rare
2x better than rare rarity (stats-wise). This rarity may have up to 3 skills. Can be increased up to 5 skills

How to get them? 
> 1. Gacha Pack
> 2. Server Drop (Rate: 1.8%)
> 3. Daily Summon (Rate: 5%)

### Legendary
2.5x better than Ultra Rare rarity (stats-wise). This rarity may have up to 5 skills. Can be increased up to 10 skills

How to get them? 
> 1. Gacha Pack
> 2. Server Drop (Rate: 0.2%)
> 3. Daily Summon (Rate: 1%)

## Special Rarity

### Special
Ideally this weapon would have base stats similar to [Ultra Rare](https://github.com/CrauxZahard/BabuV2/new/rpg#ultra-rare) rarity.
It can have up to 1 [Special]() skill that no other weapon can get.
Additionally it can have up to 2 normal skills. Can be expanded up to 4 normal skills.

How to get them?
> 1. Given straight from the developer as an appreciation or something else.
> 2. Giveaway from the developer himself.

### Limited
Ideally this weapon would have base stats similar to [Legendary](https://github.com/CrauxZahard/BabuV2/new/rpg#legendary) rarity.
It can have up to 2 [Special]() skills that no other weapon can get.
Additionally it can have up to 3 normal skills. Can be expanded up to 8 normal skills.

How to get them?
> 1. Limited gacha banner.
> 2. A very-special event.

### Event
Ideally this weapon would have base stats similar to [Ultra Rare](https://github.com/CrauxZahard/BabuV2/new/rpg#ultra-rare) rarity.
It can have up to 1 [Special]() skill that no other weapon can get.
Additionally it can have up to 2 normal skills. Can be expanded up to 4 normal skills.

How to get them?
> 1. Events like summer or christmas.
