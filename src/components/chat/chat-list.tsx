import { useMessageContext } from "@/contexts/message-context";

export default function MessageList() {
  const { messages, error, isOnline } = useMessageContext();

  return (
    <div className="h-full overflow-y-auto p-2 space-y-4">
      {!isOnline && (
        <p className="text-center text-red-500">
          You are offline. Please check your internet connection.
        </p>
      )}
      {!messages ||
        (messages?.data?.messages?.length < 1 && (
          <p className="text-center text-gray-500">No messages yet!</p>
        ))}
      {error && <p>Something went wrong</p>}
      {messages?.data.messages && (
        <div className="space-y-4">
          {messages?.data?.messages?.map((item) => (
            <div key={item._id} className="flex items-start space-x-3">
              {item.sender.image && (
                <img
                  src={item.sender.image}
                  alt={`${item.sender.firstName}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}

              <div className="flex-grow bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {item.sender.firstName}
                  </p>
                  <p className="text-xs text-gray-500">{item.timestamp}</p>
                </div>

                <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
