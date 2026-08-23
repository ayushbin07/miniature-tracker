'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Chip } from '@heroui/react';

export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  description?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH" | null;
  dueDate?: string | null;
}

interface PlayfulTodolistProps {
  tasks: Task[];
  onToggle: (id: string, isCompleted: boolean) => void;
}

const getPathAnimate = (isChecked: boolean) => ({
  pathLength: isChecked ? 1 : 0,
  opacity: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
  pathLength: { duration: 1, ease: 'easeInOut' },
  opacity: {
    duration: 0.01,
    delay: isChecked ? 0 : 1,
  },
});

const priorityConfig = {
  LOW:    { label: "Low",    color: "success" },
  MEDIUM: { label: "Medium", color: "warning" },
  HIGH:   { label: "High",   color: "danger"  },
} as const;

function PlayfulTodolist({ tasks, onToggle }: PlayfulTodolistProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 text-center text-muted-foreground">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 space-y-6">
      {tasks.map((item, idx) => {
        const isChecked = item.status === "COMPLETED";
        const pCfg = item.priority ? priorityConfig[item.priority] : null;

        return (
          <div key={item.id} className="space-y-6">
            <div className="flex items-center space-x-4">
              {/* Checkbox toggle */}
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggle(item.id, !isChecked)}
                className={`shrink-0 h-8 w-8 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                  isChecked
                    ? 'bg-primary border-primary'
                    : 'border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-950 hover:border-primary'
                }`}
              >
                {isChecked && (
                  <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 12 12"
                    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>

              {/* Content column */}
              <div className="flex-1 min-w-0 space-y-2 py-1">
                {/* Title + wavy strikethrough */}
                <div className="relative block w-full">
                  <Label className={`cursor-pointer text-2xl font-bold ${isChecked ? 'text-muted-foreground' : ''}`}>
                    {item.title}
                  </Label>
                  <motion.svg
                    preserveAspectRatio="none"
                    viewBox="0 0 340 32"
                    className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 w-full h-8"
                  >
                    <motion.path
                      d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
                      vectorEffect="non-scaling-stroke"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      fill="none"
                      initial={false}
                      animate={getPathAnimate(isChecked)}
                      transition={getPathTransition(isChecked)}
                      className="stroke-neutral-900 dark:stroke-neutral-100"
                    />
                  </motion.svg>
                </div>

                {/* Description */}
                {item.description && (
                  <p className={`text-base leading-relaxed ${isChecked ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                    {item.description}
                  </p>
                )}

                {/* Priority + Due date pills */}
                {(pCfg || item.dueDate) && (
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {pCfg && (
                      <Chip color={pCfg.color} size="sm" variant="soft">
                        {pCfg.label}
                      </Chip>
                    )}
                    {item.dueDate && (
                      <Chip size="sm" variant="secondary">
                        📅 {format(new Date(item.dueDate), "MMM d, yyyy · h:mm a")}
                      </Chip>
                    )}
                  </div>
                )}
              </div>
            </div>

            {idx !== tasks.length - 1 && (
              <div className="border-t border-neutral-300 dark:border-neutral-700" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { PlayfulTodolist };
