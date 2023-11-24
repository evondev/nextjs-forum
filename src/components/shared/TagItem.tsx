const TagItem = ({ name }: { name: string }) => {
  return (
    <div className="py-1 px-2.5 rounded-full bg-secondary-color-6 text-secondary-color-4 text-xs dark:bg-dark4 dark:text-secondary-color-5">
      {name}
    </div>
  );
};

export default TagItem;
