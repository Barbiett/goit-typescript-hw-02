interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button onClick={onClick}>Load More</button>
    </div>
  );
}
