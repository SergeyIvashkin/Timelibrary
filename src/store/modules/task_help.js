export default class Task {
  constructor(
    title,
    description,
    whatWatch,
    completed,
    editing,
    tagUsed,
    time,
    user = null,
    id = null
  ) {
    this.title = title;
    this.description = description;
    this.whatWatch = whatWatch;
    this.completed = completed;
    this.editing = editing;
    this.tagUsed = tagUsed;
    this.time = time;
    this.user = user;
    this.id = id;
  }
}
