import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from '../../styles/Home.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function FormModal({
  open,
  onClose,
  symbol,
  selectSymbol,
  filteredData,
  currAvg,
  currMinAvg,
  currMaxAvg,
  setCurrMinAvg,
  setCurrMaxAvg,
  onSave,
}) {
  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <div className={styles.modalContent}>
        <div>
          <h2 id="simple-modal-title">Add alert</h2>
          <div>
            <p>Here are only symbols with available average value</p>
            <Select label="test" value={symbol} onChange={selectSymbol}>
              {filteredData.map((item) => (
                <MenuItem key={item.symbol} value={item.symbol}>
                  {item.symbol}
                </MenuItem>
              ))}
            </Select>
          </div>
          <p>Average for chosen symbol is {currAvg}</p>
          <div>
            <div>
              <TextField type="number" label="Min average" value={currMinAvg} onChange={setCurrMinAvg} />
            </div>
            <div>
              <TextField type="number" label="Max average" value={currMaxAvg} onChange={setCurrMaxAvg} />
            </div>
          </div>
          <p>You will get notification when average is between your input values</p>
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
