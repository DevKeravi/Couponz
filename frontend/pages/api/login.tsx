import { placeholdUrl } from "../../define";
import { userProp } from "../../reducers/user";

export const dummyUser: userProp[] = [
  {
    id: "cmkrosp@naver.com",
    name: "채성렬",
    avatar_url: placeholdUrl + "300x300",
  },
  {
    id: "test@naver.com",
    name: "테스터",
    avatar_url: placeholdUrl + "300x300",
  },
];

export default function LoginRouter(req: any, res: any) {
  if (req.method === "POST") {
    //검증
    const userData = { id: req.body.id, password: req.body.password };

    const idx = dummyUser.findIndex((user: any) => user.id === userData.id);

    // 찾지못함
    if (idx < 0) {
      res.status(400).json({ error: "존재하지 않은 계정입니다." });
      return;
    }

    //토큰 발급
    const token = "testToken";
    res.setHeader("Set-Cookie", `token=${token}; path=/;`);
    res.status(200).json(dummyUser[idx]);
    return;
  }
  res.status(400).json({ error: "해당 메서드는 존재 하지 않습니다." });
}
