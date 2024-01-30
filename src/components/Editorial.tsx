import EditorialComp from "pages/editorial";
import React, { FC, useState } from "react";
interface UserProps {
  name: string;
  auth: string;
  base: string;
}
interface Props {
  data: any;
  user: UserProps;
  back: () => void;
  lessonList: any;
  refetch: () => void
}
const Editorial: FC<Props> = ({ data, user, back, lessonList, refetch }) => {
  const [saving, setSaving] = useState(false);
  console.log(lessonList, "EDITT SIDE");
  return (
    <>
      <EditorialComp
        data={data}
        back={back}
        lessonlist={lessonList}
        name={user.name}
        isBusy={saving}
      />
    </>
  );
};

export default Editorial;
