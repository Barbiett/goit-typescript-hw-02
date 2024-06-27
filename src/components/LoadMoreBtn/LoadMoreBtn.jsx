export default function LoadMoreBtn({ onClick }) {
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
