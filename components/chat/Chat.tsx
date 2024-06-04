import { Empty } from "./Empty";
import { Message } from "./Message";

const EMPTY_DUMMY = [];
const MESSAGE_DUMMY = [
  { id: "1", content: "더미데이터1", role: "user" },
  { id: "2", content: "더미데이터2", role: "assistant" },
];
export function Chat() {
  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {EMPTY_DUMMY.length === 0 ? (
          <Empty />
        ) : (
          <>
            {MESSAGE_DUMMY.map((message) => (
              <Message
                key={message.id}
                name={"user"}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>
      {/* input 영역 */}
      <div></div>
    </div>
  );
}
