import { Canister, query, text, update, Void, Record, nat64, StableBTreeMap, Vec } from 'azle';

const User = Record({
    id: text,
    name: text,
    lastSeen: text,
    age: text,
    created: nat64,
})

type User = typeof User;

const Message = Record({
    id: text,
    sender: User,
    recipient: User,
    content: text,
    created: nat64,
})

type Message = typeof Message;

type ChatId = text;
type UserId = text;

let users = StableBTreeMap<UserId, User>(text, User, 0);
let chats = StableBTreeMap<ChatId, Vec<Message>>(text, Vec(Message), 0);
let userChats = StableBTreeMap<UserId, Vec<ChatId>>(text, Vec(text), 0);


export default Canister({
    // CRUD FOR USERS:
    createUser: update([User], User, (user) => {
        users.put(user.id, user);
        return user;
    }),

    readUser: query([text], User, (userId) => {
        return users.get(userId);
    }),

    updateUser: update([User], User, (user) => {
        users.put(user.id, user);
        return user;
    }),

    deleteUser: update([text], Void, (userId) => {
        users.delete(userId);
    }),
});

