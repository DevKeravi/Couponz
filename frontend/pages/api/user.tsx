import { dummyUser } from "./login";

export default function UserRouter(req: any, res: any) {
  if (req.method === "GET") {
    // 쿠키 검증 및 쿠키를 기반으로 데이터 조회
    //세션
    res.status(200).json(dummyUser[0]);
    return;
  }

  res.status(400).json({ error: "해당 메서드는 존재 하지않습니다." });
}
