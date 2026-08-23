"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Modal,
  Button,
  TextField,
  Input,
  Label,
  Select,
  ListBox,
  DatePicker,
  DateField,
  Calendar,
} from "@heroui/react";
import { getLocalTimeZone, today, parseAbsoluteToLocal } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PlayfulTodolist, Task } from "@/components/animate-ui/components/community/playful-todolist";

// ── Calendar sidebar ────────────────────────────────────────────────────────
function TaskCalendar({ tasks }: { tasks: Task[] }) {
  const [focusedDate, setFocusedDate] = useState<DateValue>(today(getLocalTimeZone()));

  const taskDays = useMemo(() => {
    const set = new Set<string>();
    for (const t of tasks) {
      if (t.dueDate) set.add(t.dueDate.slice(0, 10));
    }
    return set;
  }, [tasks]);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
        Task Calendar
      </p>
      <Calendar
        aria-label="Task calendar"
        focusedValue={focusedDate}
        onFocusChange={setFocusedDate}
        isReadOnly
      >
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => (
              <Calendar.Cell date={date}>
                {({ formattedDate }) => (
                  <>
                    {formattedDate}
                    {taskDays.has(date.toString()) && <Calendar.CellIndicator />}
                  </>
                )}
              </Calendar.Cell>
            )}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
      <div className="flex items-center gap-2 px-1 pb-1">
        <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
        <span className="text-[11px] text-muted-foreground">Day with a task due</span>
      </div>
    </div>
  );
}

// ── Main client component ───────────────────────────────────────────────────
export function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<string>("MEDIUM");
  const [dueDate, setDueDate] = useState<DateValue | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then(setTasks)
      .catch(() => toast.error("Could not load tasks"))
      .finally(() => setIsLoading(false));
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDueDate(null);
  };

  const handleCreateTask = async (close: () => void) => {
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          priority,
          dueDate: dueDate
            ? dueDate.toDate(getLocalTimeZone()).toISOString()
            : undefined,
          status: "TODO",
        }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setTasks((prev) => [created, ...prev]);
      toast.success("Task created!");
      resetForm();
      close();
    } catch {
      toast.error("Could not create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (id: string, isCompleted: boolean) => {
    const prev = [...tasks];
    setTasks((t) =>
      t.map((task) => (task.id === id ? { ...task, status: isCompleted ? "COMPLETED" : "TODO" } : task))
    );
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: isCompleted ? "COMPLETED" : "TODO" }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(prev);
      toast.error("Could not update task");
    }
  };

  return (
    <div className="w-full flex gap-6 items-start">
      {/* ── Left: tasks ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {isLoading ? (
          <div className="flex justify-center py-16 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : (
          <PlayfulTodolist tasks={tasks} onToggle={handleToggleTask} />
        )}
      </div>

      {/* ── Right: calendar ─────────────────────────────────────────────── */}
      <div className="hidden lg:block w-72 shrink-0">
        <TaskCalendar tasks={tasks} />
      </div>

      {/* ── Floating + button + Modal ───────────────────────────────────── */}
      <Modal>
        <Button
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-xl z-50 bg-indigo-500 hover:bg-indigo-600 text-white border-none"
          aria-label="Add new task"
          isIconOnly
        >
          <Plus className="size-6" />
        </Button>

        <Modal.Backdrop variant="blur">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              {({ close }) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                      <Plus className="size-5" />
                    </Modal.Icon>
                    <Modal.Heading>New Task</Modal.Heading>
                    <p className="mt-1 text-sm text-muted">
                      Fill in the details below to add a new task.
                    </p>
                  </Modal.Header>

                  <Modal.Body className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Title */}
                      <TextField
                        className="w-full"
                        isRequired
                        value={title}
                        onChange={setTitle}
                        variant="secondary"
                      >
                        <Label>Title</Label>
                        <Input placeholder="What needs to be done?" />
                      </TextField>

                      {/* Description */}
                      <TextField
                        className="w-full"
                        value={description}
                        onChange={setDescription}
                        variant="secondary"
                      >
                        <Label>Description</Label>
                        <Input placeholder="Optional details…" />
                      </TextField>

                      {/* Priority */}
                      <Select
                        className="w-full"
                        selectedKey={priority}
                        onSelectionChange={(key) => setPriority(key as string)}
                        variant="secondary"
                      >
                        <Label>Priority</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="LOW" textValue="Low">
                              🟢 Low<ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="MEDIUM" textValue="Medium">
                              🟡 Medium<ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="HIGH" textValue="High">
                              🔴 High<ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* Due date */}
                      <DatePicker
                        className="w-full"
                        value={dueDate}
                        onChange={setDueDate}
                        variant="secondary"
                        granularity="minute"
                      >
                        <Label>Due Date</Label>
                        <DateField.Group fullWidth>
                          <DateField.Input>
                            {(segment) => <DateField.Segment segment={segment} />}
                          </DateField.Input>
                          <DateField.Suffix>
                            <DatePicker.Trigger>
                              <DatePicker.TriggerIndicator />
                            </DatePicker.Trigger>
                          </DateField.Suffix>
                        </DateField.Group>
                        <DatePicker.Popover>
                          <Calendar aria-label="Event date">
                            <Calendar.Header>
                              <Calendar.Heading />
                              <Calendar.NavButton slot="previous" />
                              <Calendar.NavButton slot="next" />
                            </Calendar.Header>
                            <Calendar.Grid>
                              <Calendar.GridHeader>
                                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                              </Calendar.GridHeader>
                              <Calendar.GridBody>
                                {(date) => <Calendar.Cell date={date} />}
                              </Calendar.GridBody>
                            </Calendar.Grid>
                          </Calendar>
                        </DatePicker.Popover>
                      </DatePicker>
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" slot="close" onPress={resetForm}>
                      Cancel
                    </Button>
                    <Button
                      isDisabled={!title.trim() || isSubmitting}
                      onPress={() => handleCreateTask(close)}
                    >
                      {isSubmitting ? (
                        <Loader2 className="size-4 animate-spin mr-2" />
                      ) : null}
                      Create Task
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
