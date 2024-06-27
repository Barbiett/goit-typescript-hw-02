import css from "./ImageCard.module.css";
export default function ImageCard({
  photo: { urls, alt_description, likes, description, user },
}) {
  return (
    <div className={css.card}>
      <img src={urls.small} alt={alt_description} />
      <ul>
        <li>Likes: {likes}</li>

        {description ? (
          <li>Description: {description}</li>
        ) : (
          <li> Description: Information not available</li>
        )}

        {user.name ? (
          <li>Creator: {user.name}</li>
        ) : (
          <li> Creator: Information not available</li>
        )}

        {user.instagram_username ? (
          <li>Creator Instagram: {user.instagram_username}</li>
        ) : (
          <li>Creator Instagram: Information not available</li>
        )}

        {user.twitter_username ? (
          <li>Creator Twitter: {user.twitter_username}</li>
        ) : (
          <li>Creator Twitter: Information not available</li>
        )}
      </ul>
    </div>
  );
}
