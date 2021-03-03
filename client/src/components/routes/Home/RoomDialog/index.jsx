import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, List } from "@material-ui/core";
import RoomItem from "components/routes/Home/RoomDialog/RoomItem/container";

const RoomDialog = (props) => {
  const { rooms, isOpen, onClose } = props;
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle style={{ width: 250 }}>Join a room</DialogTitle>
      <DialogContent>
        <List>
          {rooms.length > 0 ? (
            rooms.map((room) => <RoomItem key={room.code} room={room} />)
          ) : (
            <div>No rooms available</div>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

RoomDialog.propTypes = {
  rooms: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoomDialog;
