export const getContent = (marker) => {
  return `
    <div>
      <img src=${marker.photoUrl} alt=${marker.name} style="width: 4rem;" />
      <h3>${marker.name}</h3>
      <a href="/things/${marker._id}">See Page</a>
    </div>
  `;
};
