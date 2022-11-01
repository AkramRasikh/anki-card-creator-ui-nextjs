const InputAnkiDeckName = ({ handleChange, value }) => {
  <input
    type='text'
    onChange={(e) => handleChange(e.target.value)}
    value={value}
  />;
};
