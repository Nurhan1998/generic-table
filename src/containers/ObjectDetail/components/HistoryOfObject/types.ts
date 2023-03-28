export type TObjectHistoryItemProps = {
  id: number,
  kindOfItem: string,
  rentGaveName: string,
  responsiblePeopleName: string,
  responsiblePeopleStatus: string,
  img: string,
}

export type TObjectListProps = {
  listOfHistoryObjects: TObjectHistoryItemProps[]
}
