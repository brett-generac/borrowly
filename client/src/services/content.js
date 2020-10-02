export const getContent = (marker) => {
  return `
    <div style="width: 5rem; height: 100%;">
      <img src=${marker.photoUrl} alt=${marker.name} style="width: 4rem;" />
      <h5>${marker.name}</h5>
    </div>
  `;
};
