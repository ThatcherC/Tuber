#!/usr/bin/python

#Python server file


class Mode():
    def __init__ (self, name, display_name, base_mode, eval_function, enabled):
        self.name = name
        self.display_name = display_name
        self.base_mode = base_mode
        self.eval_function = eval_function
        self.enabled = enabled

    def get_display_name():
        return self.display_name

    def enable():
        self.enabled = enabled

    def is_enabled():
        return self.enabled
